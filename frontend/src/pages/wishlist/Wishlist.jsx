import { useEffect, useState } from "react";
import DestinationCard from "../../components/wishlist/DestinationCard";
import wishlistService from "../../services/wishlistService";

function Wishlist() {
  const [items, setItems] = useState([]);
  const [destination, setDestination] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const loadWishlist = async () => {
    try {
      setLoading(true);
      setItems(await wishlistService.getWishlist());
    } catch (error) {
      alert(error.message || "Unable to load your wishlist.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWishlist();
  }, []);

  const addItem = async (event) => {
    event.preventDefault();
    setSaving(true);
    try {
      const item = await wishlistService.addToWishlist({
        destination_name: destination,
        location_country: country,
      });
      setItems((currentItems) => [item, ...currentItems]);
      setDestination("");
      setCountry("");
    } catch (error) {
      alert(error.message || "Unable to add this destination.");
    } finally {
      setSaving(false);
    }
  };

  const toggleVisited = async (id, isVisited) => {
    try {
      const updatedItem = await wishlistService.toggleVisited(id, isVisited);
      setItems((currentItems) => currentItems.map((item) => item.id === id ? updatedItem : item));
    } catch (error) {
      alert(error.message || "Unable to update this destination.");
    }
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Remove this destination from your wishlist?")) return;
    try {
      await wishlistService.deleteFromWishlist(id);
      setItems((currentItems) => currentItems.filter((item) => item.id !== id));
    } catch (error) {
      alert(error.message || "Unable to remove this destination.");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-black tracking-tight text-slate-900">Dream Travel Wishlist</h1>
        <p className="text-slate-500 text-sm mt-0.5">Save destinations for future travel plans.</p>
      </div>

      <form onSubmit={addItem} className="bg-white rounded-2xl border border-slate-100 p-5 grid gap-3 md:grid-cols-[1fr_1fr_auto]">
        <input value={destination} onChange={(event) => setDestination(event.target.value)} placeholder="Destination" required className="border border-slate-200 rounded-lg px-3 py-2" />
        <input value={country} onChange={(event) => setCountry(event.target.value)} placeholder="Country" required className="border border-slate-200 rounded-lg px-3 py-2" />
        <button disabled={saving} className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white disabled:opacity-60">{saving ? "Adding..." : "Add destination"}</button>
      </form>

      {loading ? <p className="text-slate-500">Loading wishlist...</p> : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => <DestinationCard key={item.id} item={item} onToggleVisited={toggleVisited} onDelete={deleteItem} />)}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
