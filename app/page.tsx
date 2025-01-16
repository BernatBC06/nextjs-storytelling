"use client";
import Image from 'next/image'
import Link from 'next/link'
import MyChart from "./providers/MyChart";
import MyChart_2 from "./providers/MyChart_2";
import NavBar from './providers/NavBar';
import PlaystyleChart  from './providers/PlaystyleChart ';
import DemographicChart  from './providers/DemographicChart';
import PlayerCountByRegionChart from './providers/PlayerCounterByRegion';
import BubbleChartByCountry from "./providers/BubbleChart";
import BubbleChartByAge from "./providers/AgeChart";
import Top5Games from "./providers/Top5Games";
import Histogram from "./providers/Histogram";
import Scatter from "./providers/Scatter";


export default function Home() {
  return (
    <div className="bg-gray-750 text-white min-h-screen">
      <NavBar />
      <div className="p-4">
        <main className="p-6">
          <h1>Proyecto de visualización de datos</h1>
        </main>
        <h1 className="text-center text-2xl font-bold mb-4">Gaming Habits and Psychology</h1>
        <section className="mb-10">
          <PlaystyleChart  />
        </section>
        <section className="mb-10">
          <PlayerCountByRegionChart  />
        </section>
        <section className="mb-10">
          <DemographicChart  />
        </section>
        <section className="mb-10">
          <BubbleChartByAge  />
        </section>
        <section className="mb-10">
          <Top5Games  />
        </section>
        <section className="mb-10">
          <Histogram  />
        </section>
      </div>
    </div>
  );
}


/*
<section className="mb-8">
  <h2 className="text-xl font-semibold mb-2">Gráfico 1: MyChart</h2>
  <MyChart />
</section>

<section>
  <h2 className="text-xl font-semibold mb-2">Gráfico 2: MyChart_2</h2>
  <MyChart_2 />
</section>
*/