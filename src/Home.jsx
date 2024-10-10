import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { foodFetch } from './Redux/foodReducer'
import FoodCard from './SingleFood'
import { Loader } from 'lucide-react'
import { addToCart } from './Redux/foodReducer'

const Home = () => {
    const dispatch = useDispatch()
    const {status , error, food , cart} = useSelector(state => state.food)
    const [item , setItem] = React.useState(null)
    const [quantity , setQuantity] = React.useState(null)

    useEffect(() => {
        dispatch(foodFetch())
    }, [dispatch])

    useEffect(() => {
        console.log(cart);
        
    }, [cart])

  return (
    <div className='grid grid-cols-4 gap-3 p-4'>
        {status === 'loading' && <div className='min-h-screen flex justify-center items-center animate-spin w-[90vw]'><Loader /></div>}
        {status === 'succeeded' && food.recipes.map(item => <FoodCard  foodItem={item} addToCart={addToCart}/>)}
    </div>
  )
}

export default Home