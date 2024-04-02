"use client";
import React, { useState, useEffect } from "react";
import { HoverEffect } from "../../components/ui/card-hover-effect";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, DocumentData } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

interface Project {
  title: string;
  description: string;
  link: string;
  tag: string;
}

// interface Props {
//   projects: Project[];
// }

interface Items {
  id: string;
  title: string;
  link: string;
  tag: string;
  description: string;
  user_id: string;
}

interface Props {
  projects: Items[];
}

const items = ["tele", "tv", "tech"];

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);

  const [users, setUsers] = useState<Items[]>([]);

  useEffect(() => {
    async function fetchItems() {
      const querySnapshot = await getDocs(collection(db, "Item"));
      const usersData: Items[] = [];
      querySnapshot.forEach((doc: DocumentData) => {
        usersData.push({ id: doc.id, ...doc.data() });
      });
      console.log(usersData);
      setUsers(usersData);
    }

    fetchItems();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const fetchedProjects: Project[] = await response.json();
        setProjects(fetchedProjects);
        console.log(projects);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const allProjects: Project[] = await response.json();

        const filteredProjects = selectedItem
          ? allProjects.filter((project) => project.tag === selectedItem)
          : allProjects;

        setProjects(filteredProjects);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedItem]);

  const handleSelectChange = (value: string) => {
    setSelectedItem(value === selectedItem ? null : value); // Toggle selection if the same item is clicked again
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <label htmlFor="item" className="text-white">
        <br />
        <select
          id="item"
          value={selectedItem || ""} // Set the value to selectedItem or an empty string
          onChange={(e) => {
            handleSelectChange(e.target.value);
          }}
          className="bg-gray-800 text-white p-2 rounded-md"
        >
          <option value="">Default</option>
          {items.map((selectedItem) => (
            <option key={selectedItem} value={selectedItem}>
              {selectedItem}
            </option>
          ))}
        </select>
      </label>
      <div className="text-center">
        {/* <div>
          <CardHoverEffectDemo projects={projects} />
        </div> */}
        <div>
          <CardHoverEffectDemo projects={users} />
        </div>
      </div>
    </div>
  );
}

function CardHoverEffectDemo({ projects }: Props) {
  return (
    <div>
      <div className="max-w-5xl mx-auto px-8">
        <HoverEffect items={projects} />
      </div>
    </div>
  );
}
