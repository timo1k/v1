"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@chakra-ui/react";
import { HoverEffect } from "./card-hover-effect";
import { TypewriterEffectSmooth } from "./typewriter-effect";
import Link from "next/link";
import { LampContainer } from "./lamp";
import { Search } from "lucide-react";

interface Project {
  title: string;
  description: string;
  link: string;
  tag: string;
}

interface Props {
  projects: Project[];
}

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [searchQuery, setSearchQuery] = useState<string | null>(null);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/data.json");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const allProjects: Project[] = await response.json();

        const filteredProjects = searchQuery
          ? allProjects.filter((project) => project.title == searchQuery)
          : allProjects;

        setProjects(filteredProjects);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchQuery]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value === searchQuery ? null : value);
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-center">
        <TypewriterEffectSmoothDemo />
        <br></br>
        <br></br>
        <br></br>

        {/* <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            value={searchQuery || ""}
            onChange={(e) => {
              handleSearchChange(e.target.value);
            }}
          />
        </div> */}

        <CardHoverEffectDemo projects={projects} />
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
