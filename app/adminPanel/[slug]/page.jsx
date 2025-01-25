export default function User({ params }) {
  const { slug } = params; 
  return (
    <div>
      <h1>{slug}</h1>
    </div>
  );
}
