export default function Project({ project }) {
  const image =
    project.images?.length > 0
      ? project.images[0]
      : "/img/no-image.png";

  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition">
      <img
        src={image}
        alt={project.name}
        className="w-full h-48 object-cover rounded"
      />

      <h2 className="text-xl font-semibold mt-3">{project.name}</h2>

      <p className="text-gray-600 mt-1">
        {project.description?.slice(0, 100)}...
      </p>
    </div>
  );
}
