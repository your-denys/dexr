import {useState, useEffect} from 'react'

function Providers() {
  const [providers, setProviders] = useState([]);
     
       useEffect(() => {
         const fetchTransactions = async () => {
           try {
            const data = [
              { id: 1, address: "5Q5...4j1", percent: 0.34, amount: 3963455 },
            ];
            
            setProviders(data);
           } catch (error) {
             console.error("Error:", error);
           }
         };
     
         fetchTransactions();
       }, []);
     
       return (
           <table>
             <thead>
               <tr>
                 <th>RANK</th>
                 <th>ADDRESS</th>
                 <th>%</th>
                 <th>AMOUNT</th>
               </tr>
             </thead>
             <tbody>
               {providers.map((holder, index) => (
                 <tr key={holder.id}>
                   <td style={{ color: '#808080', fontWeight: 200 }}>#{holder.id}</td>
                   <td>{holder.address}</td>
                   <td>{holder.percent.toFixed(2)}%</td>
                   <td>{holder.amount.toFixed(2)}</td>
                 </tr>
               ))}
             </tbody>
           </table>
       );
     }
  
export default Providers