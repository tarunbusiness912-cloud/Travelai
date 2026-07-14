import { supabase } from "./lib/supabase";
import AppRoutes from "./routes/AppRoutes";

function App() {
  console.log("App Loaded", supabase);

  return <AppRoutes />;
}

export default App;