"use client"
import { scrapeAndStoreProduct } from "@/lib/actions";
import { FormEvent, useState } from "react"

const isValidAmazonProductURL = (url:string)=>{

  try{
    const passedURL = new URL(url);
    const hostname  = passedURL.hostname;

    if(hostname.includes('amazon.com') || 
       hostname.includes('amazon.')||
       hostname.endsWith('amazon')){
        return true;
       }
  }catch(e){
    return false;
  }
  return false;
}

const SearchBar = () => {
    const [searchPrompt,setSearchPrompt] = useState('');
    const [isLoading,setLoading] = useState(false);

    const handleSubmit = async(event:FormEvent<HTMLFormElement>)=>{
      event.preventDefault();
      const isValidLink = isValidAmazonProductURL(searchPrompt);
      if(!isValidLink)return alert('Please Provide a valid Amazon Link...');

      try{
        setLoading(true);
        // Scrap Product Page...
        const product = await scrapeAndStoreProduct(searchPrompt);

      }catch(e){
        console.log(e);
      }finally{
        setLoading(false);
      }

    }

  return (
    <form className='flex flex-wrap gap-4 mt-12'
    onSubmit={handleSubmit}
    >
    <input type="text" value={searchPrompt} onChange={(e)=>setSearchPrompt(e.target.value)} placeholder="Enter Product Link Here"  className="searchbar-input"/>
    <button type="submit" className="searchbar-btn" disabled={searchPrompt===''}>
      {isLoading ? 'Searching...' : 'Search'}
    </button>
    </form>
  )
}

export default SearchBar