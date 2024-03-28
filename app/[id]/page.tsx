"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

import React from "react";
import { BackgroundGradient } from "../background-gradient";
import { IconAppWindow } from "@tabler/icons-react";
import Image from "next/image";

interface Project {
  title: string;
  description: string;
  link: string;
  email: string;
}

export default function Page({ params }: any) {
  const [projects, setProjects] = useState<Project[]>([]);

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

  // Filter projects based on the specific link
  const specificLink = `/${params.id}`; // Change this to your desired link
  const filteredProjects = projects.filter(
    (project) => project.link === specificLink
  );

  return (
    <div>
      <div className="flex justify-center items-center h-screen">
        {filteredProjects.map((project) => (
          <div key={project.title}>
            <BackgroundGradientDemo project={project} />
          </div>
        ))}
      </div>
    </div>
  );
}
function BackgroundGradientDemo({ project }: { project: Project }) {
  return (
    <div className="max-w-sm rounded-[22px] overflow-hidden">
      <BackgroundGradient className="p-4 sm:p-10 bg-white dark:bg-zinc-900">
        <Image
          src="/next.svg"
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
          <h1>contant me: {project.email}</h1>
        </div>

        <Link href={project.link}>LINKKKKKK</Link>
      </BackgroundGradient>
    </div>
  );
}
