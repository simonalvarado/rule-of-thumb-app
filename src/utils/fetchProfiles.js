import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

export function fetchProfiles(profiles, loading) {
  const profilesCollectionRef = collection(db, "profiles");
  onSnapshot(profilesCollectionRef, (snapshot) => {
    profiles.value = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    loading.value = false;
  });
}
