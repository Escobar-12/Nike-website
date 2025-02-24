export default function shiftPics(event,products,shoeImageDisplay,setShoeImageDisplay)
{
        const index = products.findIndex(product => product.imgURL === shoeImageDisplay);
        if(index===-1)return;
        if(event.key === "ArrowRight")
        {
            
            if(index<products.length-1)
            {
                setShoeImageDisplay(products[index+1].imgURL);
            }
            else
            {
                setShoeImageDisplay(products[0].imgURL);
            }
        } 
        else if(event.key === "ArrowLeft") 
        {
            if(index>0)
            {
                setShoeImageDisplay(products[index-1].imgURL);
            }
            else
            {
                setShoeImageDisplay(products[products.length-1].imgURL)
            }
        }
    
}

