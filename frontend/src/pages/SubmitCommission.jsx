import React,{useState} from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { postCommissionProof } from '../store/slices/commissionSlice';

const SubmitCommission = () => {
    const [proof,setProof]=useState("");
    const [amount,setAmount]=useState("");
    const [comment,setComment]=useState("");

    const proofHandler=(e)=>{
        const file=e.target.files[0];
        setProof(file);
    }

    const dispatch=useDispatch();
    const {loading}=useSelector((state)=>state.commission);
    const handlePaymentProof=(e)=>{
        e.preventDefault();
        const formData=new FormData();
        formData.append("proof",proof);
        formData.append("amount",amount);
        formData.append("comment",comment);
        dispatch(postCommissionProof(formData));
    };
  return (
         <>
      <section className="w-full ml-0 m-0 h-fit px-5 pt-20 lg:pl-[320px] flex flex-col min-h-screen py-4 justify-start">
        <div className="bg-white mx-auto w-full h-auto px-2 flex flex-col gap-4 items-center py-4 justify-center rounded-md ">
          <form className="flex flex-col gap-5 w-full" onSubmit={handlePaymentProof}> 
             <h3 className={`text-[#D6482B] text-xl font-semibold mb-2 min-[480px]:text-xl md:text-2xl lg:text-3xl`}>Upload Payment Proof</h3>
            <div className="flex flex-col gap-2">
                <label className="text=[16px] text-stone-500">Amount</label>
                <input type="number" 
                value={amount} 
                onChange={(e)=>setAmount(e.target.value)}
                className="text-[16px] py-2 bg-transparent border-b-[1px]  border-b-stone-500 focus:outline-none"/>
            </div>
             <div className="flex flex-col gap-2">
                <label className="text=[16px] text-stone-500">Payment Proof (Screenshot)</label>
                <input type="file" 
                onChange={proofHandler} 
               className="file:mr-4 file:py-2 file:px-4 
             file:rounded-md file:border-0 
             file:text-sm file:font-semibold 
             file:bg-stone-300 file:text-grey-100
             hover:file:bg-stone-600"/>
              
            </div>
             <div className="flex flex-col gap-2">
                <label className="text=[16px] text-stone-500">Comment</label>
                <textarea
                value={comment} 
                onChange={(e)=>setComment(e.target.value)}
                rows={7}
                className="text-[16px] py-2 bg-transparent border-b-[1px]  border-b-stone-500 rounded-md px-1 focus:outline-black"/>
            </div>
             <button
              className="bg-[#d6482b] w-[280px] font-semibold hover:bg-[#b8381e]  transition-all duration-300 text-xl py-2 px-4 rounded-md text-white  mx-auto  my-4"
              type="submit"
            >
              {loading ? "Uploading..." : "Upload Payment Proof"}
            </button>
              </form>
          </div>
        
           
          
          </section>
          </>
      
  )
}

export default SubmitCommission;
