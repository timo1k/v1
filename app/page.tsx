"use client";
import React, { useState, useEffect } from "react";
import { HoverEffect } from "../components/ui/card-hover-effect";
import { TypewriterEffectSmooth } from "../components/ui/typewriter-effect";
import Link from "next/link";
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

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);

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
    // Fetching data asynchronously
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json"); // Assuming the JSON file is named data.json
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const fetchedProjects: Project[] = await response.json();
        setProjects(fetchedProjects);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-center">
        <TypewriterEffectSmoothDemo />
        <br></br>
        <br></br>
        <br></br>
        {/* <CardHoverEffectDemo projects={projects} />
         */}
        <CardHoverEffectDemo projects={users} />
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
function TypewriterEffectSmoothDemo() {
  // A web-based service to trade items with security

  const words = [
    {
      text: "A",
    },
    {
      text: "web-based",
    },
    {
      text: "service",
    },
    {
      text: "to",
    },
    {
      text: "trade",
    },
    {
      text: "items",
    },
    {
      text: "with",
    },
    {
      text: "security.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[40rem]  ">
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base  ">
        Temple Trading Hub
      </p>
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <Link href={"/signup"}>
          <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
            Sign Up
          </button>
        </Link>
        <Link href={"/login"}>
          <button className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
            Log In
          </button>
        </Link>
      </div>
    </div>
  );
}
