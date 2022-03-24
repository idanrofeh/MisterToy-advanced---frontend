import { ToyPreview } from "./ToyPreview.jsx";

export function ToyList({ toys }) {
  return (
    <section className="toy-list">
      {toys.map((toy) => (
        <ToyPreview toy={toy} key={toy._id} />
      ))}
    </section>
  );
}
