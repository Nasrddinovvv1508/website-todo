import { useCollection } from "../hooks/useCollection"

function Home() {
  let { data } = useCollection("todos")
  console.log(data);

  return (
    <div>
      
    </div>
  )
}

export default Home