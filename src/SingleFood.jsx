import React, { useEffect, useState } from 'react';
import { Star, Minus, Plus, ShoppingCart } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from './Redux/foodReducer';

export default function SingleFood({ foodItem }) {
  const [quantity, setQuantity] = useState({ [foodItem.id]: 0 });
  const dispatch = useDispatch();
  const cart = useSelector(state => state.food.cart);

  const incrementQuantity = () => {
    setQuantity(prevQuantity => ({
      ...prevQuantity,
      [foodItem.id]: prevQuantity[foodItem.id] + 1
    }));
  };

  const decrementQuantity = () => {
    setQuantity(prevQuantity => ({
      ...prevQuantity,
      [foodItem.id]: Math.max(prevQuantity[foodItem.id] - 1, 1)
    }));
  };

  const addFoodToCart = (item, quantity) => {
    const itemWithQuantity = { ...item, quantity };
    dispatch(addToCart(itemWithQuantity));
    console.log('cart', cart);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="w-full">
          <img
            src={foodItem.image}
            alt={foodItem.name}
            layout="fill"
            objectFit="cover"
            className="rounded-md h-full"
          />
          <h3 className="text-xl font-bold">{foodItem.name}</h3>
          <h4 className='text-lg'>{foodItem.cookTimeMinutes}$</h4>
        </div>
        <div className="flex items-center mt-2">
          <Star className="w-5 h-5 text-yellow-400 fill-current" />
          <span className="ml-1 text-sm font-medium">{foodItem.rating.toFixed(1)}</span>
          <span className="ml-1 text-sm text-gray-500">({foodItem.reviewCount} reviews)</span>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          {foodItem.tags.map(tag => (
            <Badge key={tag} variant="secondary">{tag}</Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={decrementQuantity}>
            <Minus className="h-4 w-4" />
          </Button>
          <span className="text-xl font-bold">{quantity[foodItem.id]}</span>
          <Button variant="outline" size="icon" onClick={incrementQuantity}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {cart.find(el => el.id === foodItem.id) ?
          <Button className="w-full" onClick={() => addFoodToCart(foodItem, quantity[foodItem.id])}>
            <Plus className="mr-2 h-4 w-4" /> Add new quantity
          </Button> :
          <Button className="w-full" onClick={() => addFoodToCart(foodItem, quantity[foodItem.id])}>
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>}
      </CardFooter>
    </Card>
  );
}