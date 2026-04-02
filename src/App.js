import "./styles.css";
import {useState,useEffect} from 'react';

const ProductCard=({image,title})=>{
  return <div className="product-card">
    <img src={image} alt={title} />
    <span>{title}</span>
  </div>
}

const Page_Size=10;
export default function App() {
  const [prodData,setProdData]=useState([]);
  const[currentPage,setCurrentPage]=useState(0)
  const fetchData = async()=>{
  const data= await fetch('https://dummyjson.com/products');
  const json=await data.json();
  setProdData(json.products);
  }
  useEffect(()=>{
    fetchData();
  },[])
  const totalProducts=prodData.length;
  const noOfPages=Math.ceil(totalProducts/Page_Size);
  const start=currentPage*Page_Size;
  const end=start+Page_Size;
function handlePageChange(n){
  setCurrentPage(n);
}
  return (
    <>
    <div className="App">
      {prodData?prodData.slice(start,end).map((e)=>(
<ProductCard key={e.id} image={e.thumbnail} title={e.title}/>
))      :"no product found"
}

    </div>
    <div className="Pagination">
    {[...Array(noOfPages).keys()].map((n)=>{
      return (
      <span onClick={()=>handlePageChange(n)} className="pageNummber" key={n}>{n}</span>
      )
    })}
  </div>
  </>
  );
}
