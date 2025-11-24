import { Pipelines } from '../components/pipelines/pipelines';

export default function Home() {
  return (
    <div className="theme-green">
      <div className="flex flex-wrap m-4 rounded-lg border border-(--pipelines-border)">
        <div className="w-full p-2 border-b border-(--pipelines-border)">
          <h2 className="text-2xl font-bold text-(--pipelines-text)">
            Sk8 admin
          </h2>
        </div>
        <div className="p-2 border-r border-(--pipelines-border) text-(--pipelines-text)">
          <p>Admin navbar</p>
        </div>
        <div className="flex-1 p-5">
          <Pipelines mode="local" theme="green" />
        </div>
      </div>
    </div>
  );
}
