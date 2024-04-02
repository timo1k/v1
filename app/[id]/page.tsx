"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import React from "react";
import { BackgroundGradient } from "../../components/ui/background-gradient";
import { IconAppWindow } from "@tabler/icons-react";
import Image from "next/image";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import { Item } from "@radix-ui/react-select";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// interface Project {
//   title: string;
//   description: string;
//   link: string;
//   email: string;
// }

interface Items {
  id: string;
  title: string;
  link: string;
  tag: string;
  description: string;
  user_id: string;
}

// interface Props {
//   projects: Items[];
// }

export default function Page({ params }: any) {
  // const [projects, setProjects] = useState<Project[]>([]);
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

  // useEffect(() => {
  //   // Fetching data asynchronously
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch("/data.json"); // Assuming the JSON file is named data.json
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch data");
  //       }
  //       const fetchedProjects: Project[] = await response.json();
  //       setProjects(fetchedProjects);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  // Filter projects based on the specific link
  const id = `${params.id}`; // Change this to your desired link
  const filteredItems = users.filter((item) => item.id === id);

  if (filteredItems.length === 0) {
    return <div>Loading...</div>; // Or handle the case when the item with the given ID is not found
  }

  const item = filteredItems[0];

  return (
    <div className="flex justify-center items-center h-screen">
      <BackgroundGradientDemo project={item} />
    </div>
  );
}
function BackgroundGradientDemo({ project }: { project: Items }) {
  return (
    <div className="max-w-sm rounded-[22px] overflow-hidden">
      <BackgroundGradient className="p-4 sm:p-10 bg-white dark:bg-zinc-900">
        <Image
          src={project.link}
          alt="NOT FOUND"
          height="400"
          width="400"
          className="object-cover"
        />
        <div className="text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
          {project.title}
        </div>

        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          {project.description}
        </div>
        <br></br>
        <div className="text-sm text-neutral-600 dark:text-neutral-400">
          <h1>contant me: {project.user_id}</h1>
        </div>

        {/* <Link href={project.link}>LINKKKKKK</Link> */}
      </BackgroundGradient>
    </div>
  );
}
