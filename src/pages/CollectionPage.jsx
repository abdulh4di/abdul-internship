import { useEffect, useState } from "react";
import CollectionHeader from "../components/collection/CollectionHeader";
import CollectionInfo from "../components/collection/CollectionInfo";
import CollectionItems from "../components/collection/CollectionItems";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CollectionContext } from "../context/CollectionContext";

export default function CollectionPage() {
  const { id } = useParams();
  const [collectionInfo, setCollectionInfo] = useState();
  const [collectionItemsInfo, setollectionItemsInfo] = useState()
  const [loading, setLoading] = useState(true);

  async function fetchCollectionInfo() {
    setLoading(true);
    const { data } = await axios.get(
      `https://remote-internship-api-production.up.railway.app/collection/${id}`
    );
    setCollectionInfo(data.data);
    setollectionItemsInfo(data.data.items)
    setLoading(false);
  }

  useEffect(() => {
    fetchCollectionInfo();
    window.scrollTo(0, 0);
  }, [id]);

  return (
    <CollectionContext.Provider value={{ loading, collectionInfo, collectionItemsInfo }}>
      <CollectionHeader />
      <CollectionInfo />
      <CollectionItems />
    </CollectionContext.Provider>
  );
}
