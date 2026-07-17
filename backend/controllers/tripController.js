const supabase = require('../config/supabase');

const mapTrip = (trip) => ({
  id: trip.id,
  destination: trip.destination,
  startDate: trip.start_date || trip.startDate,
  endDate: trip.end_date || trip.endDate,
  travelers: trip.travelers || 1,
  budget: Number(trip.budget || 0),
  spent: Number(trip.spent || 0),
  notes: trip.notes || '',
  aiGenerated: trip.ai_generated || trip.is_ai_generated || false,
  aiPrompt: trip.ai_prompt || '',
  itinerary: trip.itinerary || null,
  coverImage: trip.cover_image || '',
  createdAt: trip.created_at,
  updatedAt: trip.updated_at
});

const tripPayload = (body) => ({
  destination: body.destination?.trim(),
  start_date: body.startDate || body.start_date || null,
  end_date: body.endDate || body.end_date || null,
  travelers: parseInt(body.travelers, 10) || 1,
  budget: parseFloat(body.budget) || 0,
  notes: body.notes?.trim() || null,
  ai_generated: Boolean(body.aiGenerated || body.ai_generated),
  ai_prompt: body.aiPrompt || body.ai_prompt || null,
  cover_image: body.coverImage || body.cover_image || null
});

exports.getAllTrips = async (_req, res) => {
  try {
    const { data, error } = await supabase
      .from('trips')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json((data || []).map(mapTrip));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trips', error: error.message });
  }
};

exports.getTripById = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('trips')
      .select('*')
      .eq('id', req.params.id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return res.status(404).json({ error: 'Trip not found' });
      return res.status(400).json({ error: error.message });
    }

    res.status(200).json(mapTrip(data));
  } catch (error) {
    res.status(500).json({ message: 'Error fetching trip', error: error.message });
  }
};

exports.createTrip = async (req, res) => {
  try {
    const payload = tripPayload(req.body);
    if (!payload.destination) return res.status(400).json({ error: 'Destination is required' });

    const { data, error } = await supabase
      .from('trips')
      .insert([payload])
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });
    res.status(201).json(mapTrip(data));
  } catch (error) {
    res.status(400).json({ message: 'Error creating trip', error: error.message });
  }
};

exports.updateTrip = async (req, res) => {
  try {
    const payload = tripPayload(req.body);
    Object.keys(payload).forEach((key) => payload[key] === null && delete payload[key]);
    if (!payload.destination) delete payload.destination;

    const { data, error } = await supabase
      .from('trips')
      .update(payload)
      .eq('id', req.params.id)
      .select()
      .single();

    if (error) return res.status(400).json({ error: error.message });
    res.status(200).json(mapTrip(data));
  } catch (error) {
    res.status(400).json({ message: 'Error updating trip', error: error.message });
  }
};

exports.deleteTrip = async (req, res) => {
  try {
    const { error } = await supabase
      .from('trips')
      .delete()
      .eq('id', req.params.id);

    if (error) return res.status(400).json({ error: error.message });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ message: 'Error deleting trip', error: error.message });
  }
};
