import { createContext, useContext, useState, useEffect } from 'react';
import axios from "axios";

const DocumentsContext = createContext()

export const useDocuments = () => {
  return useContext(DocumentsContext)
}

export const DocumentsProvider = ({ children }) => {
  const [documents, setDocuments] = useState([]);


	useEffect(() => {
		(async () => {
			const res = await axios.get("/api/documents/");
			setDocuments(res.data.documents);
		})();
  }, []);

  return (
    <DocumentsContext.Provider value={documents}>
      {children}
    </DocumentsContext.Provider>
  )

}

export default DocumentsProvider;
