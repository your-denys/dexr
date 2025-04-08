import {useState, useEffect} from 'react'

function Holders({ onDataUpdate }) {
  const [holders, setHolders] = useState([]);
   
     useEffect(() => {
       const fetchTransactions = async () => {
         try {
          const data = [
            { id: 1, address: "5Q5...4j1", percent: 0.34, amount: 3963455, value: 2045 },
            { id: 2, address: "5Q5...4j1", percent: 0.34, amount: 3963455, value: 2045 },
            { id: 3, address: "5Q5...4j1", percent: 0.34, amount: 3963455, value: 2045 },
            { id: 4, address: "5Q5...4j1", percent: 0.34, amount: 3963455, value: 2045 },
            { id: 5, address: "5Q5...4j1", percent: 0.34, amount: 3963455, value: 2045 },
            { id: 6, address: "5Q5...4j1", percent: 0.34, amount: 3963455, value: 2045 }
          ];
          
          setHolders(data);
          onDataUpdate(data.length); 
         } catch (error) {
           console.error("Error:", error);
         }
       };
   
       fetchTransactions();
     }, [onDataUpdate]);
   
     return (
         <table>
           <thead>
             <tr>
               <th>RANK</th>
               <th>ADDRESS</th>
               <th>%</th>
               <th>AMOUNT</th>
               <th>VALUE</th>

             </tr>
           </thead>
           <tbody>
             {holders.map((holder, index) => (
               <tr key={holder.id}>
                 <td style={{ color: '#808080', fontWeight: 200 }}>#{holder.id}</td>
                 <td>{holder.address}</td>
                 <td>{holder.percent.toFixed(2)}%</td>
                 <td>{holder.amount.toFixed(2)}</td>
                 <td>${holder.value.toFixed(1)}</td>
               </tr>
             ))}
           </tbody>
         </table>
     );
   }

export default Holders