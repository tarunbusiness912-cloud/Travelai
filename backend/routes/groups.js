const express = require('express');
const supabase = require('../config/supabase');

const router = express.Router();

const conductorPackages = [
  {
    id: 'gokarna-beach-trek',
    name: 'Gokarna Beach Trek',
    description: 'All-inclusive weekend squad with sleeper bus, dorm stay, local guide, and beach trail.',
    destination: 'Gokarna, Karnataka',
    budget: 4500,
    members: 8,
    maxMembers: 14,
    conductorName: 'Verified Conductor',
    startDate: '2026-08-01',
    endDate: '2026-08-03',
    packageType: 'conductor',
    status: 'open'
  },
  {
    id: 'hampi-ruins-loop',
    name: 'Hampi Ruins Loop',
    description: 'Budget heritage circuit with shared autos, hostel beds, and local thali stops.',
    destination: 'Hampi, Karnataka',
    budget: 5200,
    members: 5,
    maxMembers: 10,
    conductorName: 'TravelOS Local',
    startDate: '2026-08-08',
    endDate: '2026-08-10',
    packageType: 'conductor',
    status: 'open'
  }
];

const mapGroup = (group) => ({
  id: group.id,
  ownerId: group.owner_id,
  name: group.name,
  description: group.description,
  destination: group.destination,
  startDate: group.start_date,
  endDate: group.end_date,
  coverImage: group.cover_image,
  budget: Number(group.budget || 0),
  packageType: group.package_type || 'squad',
  status: group.status || 'open',
  members: group.members || [],
  createdAt: group.created_at,
  updatedAt: group.updated_at
});

router.get('/', async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from('groups')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json([...(data || []).map(mapGroup), ...conductorPackages]);
  } catch (error) {
    res.json(conductorPackages);
  }
});

router.post('/', async (req, res) => {
  try {
    const payload = {
      owner_id: req.body.ownerId || req.body.owner_id || null,
      name: req.body.name?.trim(),
      description: req.body.description?.trim() || null,
      destination: req.body.destination?.trim() || null,
      start_date: req.body.startDate || req.body.start_date || null,
      end_date: req.body.endDate || req.body.end_date || null,
      cover_image: req.body.coverImage || req.body.cover_image || null,
      budget: parseFloat(req.body.budget) || 0,
      package_type: req.body.packageType || req.body.package_type || 'squad',
      status: req.body.status || 'open'
    };

    if (!payload.name) return res.status(400).json({ error: 'Group name is required' });

    const { data, error } = await supabase
      .from('groups')
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(mapGroup(data));
  } catch (error) {
    res.status(400).json({ error: error.message || 'Unable to create group' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const payload = {
      name: req.body.name?.trim(),
      description: req.body.description?.trim(),
      destination: req.body.destination?.trim(),
      start_date: req.body.startDate || req.body.start_date,
      end_date: req.body.endDate || req.body.end_date,
      cover_image: req.body.coverImage || req.body.cover_image,
      budget: req.body.budget === undefined ? undefined : parseFloat(req.body.budget) || 0,
      status: req.body.status
    };
    Object.keys(payload).forEach((key) => payload[key] === undefined && delete payload[key]);

    const { data, error } = await supabase
      .from('groups')
      .update(payload)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) throw error;
    res.json(mapGroup(data));
  } catch (error) {
    res.status(400).json({ error: error.message || 'Unable to update group' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { error } = await supabase.from('groups').delete().eq('id', req.params.id);
    if (error) throw error;
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message || 'Unable to delete group' });
  }
});

router.post('/:id/join', async (req, res) => {
  res.status(202).json({
    groupId: req.params.id,
    status: 'requested',
    message: 'Join request sent to the trip conductor.'
  });
});

module.exports = router;
