interface MemeImage {
    id: string;
    author: string;
    width: number;
    height: number;
    url: string;
    download_url: string;
  }
  
  export const fetchMemes = async (count = 50): Promise<string[]> => {
    const response = await fetch(`https://picsum.photos/v2/list?page=1&limit=${count}`);
    const data: MemeImage[] = await response.json();
    return data.map((item) => item.download_url);
  };
  