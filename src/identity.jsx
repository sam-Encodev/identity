import { useState } from "react";
import Input from "./components/input";
import Profile from "./components/profile/";
import { endpoint } from "./components/hooks";
import axios from "axios";

axios.defaults.headers.common["Authorization"] = import.meta.env.VITE_SOME_KEY;

function Identity() {
 const [input, setInput] = useState("");
 const [query, setQuery] = useState({});
 const [profile, setProfile] = useState(false);
 const [loading, setLoading] = useState(false);

 const handleSearch = async () => {
  if (!input) return;

  setLoading(true);
  try {
   const response = await axios.get(`${endpoint}/${input}`);
   setProfile(true);
   setQuery(response.data);
   setLoading(false);
  } catch (error) {
   setLoading(false);
   console.error(error);
  } finally {
   setInput("");
  }
 };

 return (
  <>
   <div className="container mx-auto px-4 py-5">
    <Input
     input={input}
     setInput={setInput}
     handleSearch={handleSearch}
     loading={loading}
    />
    {profile && <Profile data={query} />}
   </div>
  </>
 );
}

export default Identity;
