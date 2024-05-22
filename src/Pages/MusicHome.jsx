import { useEffect } from "react";

function MusicHome() {

  const FetchMusic = async () => {
    const url = 'https://spotify23.p.rapidapi.com/search/?q=%3CREQUIRED%3E&type=multi&offset=0&limit=10&numberOfTopResults=5';
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '06d6087b29msh8a43894100a519dp1e200ajsn020f8f4b76fb',
        'X-RapidAPI-Host': 'spotify23.p.rapidapi.com'
      }
    };
    
    try {
      const response = await fetch(url, options);
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    FetchMusic()
  },[])
  return (
    <div>
      
    </div>
  )
}

export default MusicHome
