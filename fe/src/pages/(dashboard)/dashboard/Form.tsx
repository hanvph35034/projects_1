import React, { useEffect } from "react";

import instance from "@/configs/axios";
import Joi from "joi";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
const shema = Joi.object({
  name: Joi.string().required().min(8),
  price: Joi.number().required().min(0),
  description: Joi.string(),
});

const Form = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: joiResolver(shema),
  });
  const { data, isLoading, isError } = useQuery({
    queryKey: ["product",id],
    queryFn: () => instance.get(`/products/${id}`),
  });
const mutation = useMutation({
  mutationFn:async(data:any)=>{
    if (id) {
      return instance.put(`/products/${id}`,data);
    }
    return instance.post(`/products`,data	)
  },
  onSuccess: ()=>{
    queryClient.invalidateQueries(['product'])
    reset();
    alert(id ? 'update thanh cong' : 'add thang cong');
    navigate('/admin');

  }
})
const onSubmit = (data:any)=>{
  mutation.mutate(data);
}
useEffect(()=>{
  if (data) {
    setValue('name',data.data.name);
    setValue('price',data.data.price);
    setValue('description',data.data.description);
  }
},[data,setValue]);
if(isLoading)return <div className="">loading...</div>
if(isError)return <div className=""> errorr</div>
  return 
  <div>
<form action=""  onSubmit={handleSubmit(onSubmit)}>
  <div className="">
   
  </div>
</form>
  </div>;
};

export default Form;
