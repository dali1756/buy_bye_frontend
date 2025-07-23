import { useParams } from 'react-router-dom';
import NavBar from '../components/NavBar';

function CategoryPage() {
  const { gender, type } = useParams();

  return (
    <div>
      <NavBar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">
          {gender && gender.toUpperCase()} - {type}
        </h1>
        <p>這裡顯示的是 {gender} 類別下的 {type} 商品</p>
      </div>
    </div>
  );
}

export default CategoryPage;