import axios, { AxiosError, AxiosResponse } from 'axios'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Activity } from '../../models/activity';
import { router } from '../router/routes';



const sleep = (delay:number) =>{
    return new Promise((resolve)=>{
        setTimeout(resolve,delay)
    })
}

axios.defaults.baseURL = 'https://localhost:7125/api';

const responseBody = <T>(response: AxiosResponse<T>) => response.data;


axios.interceptors.response.use(async resonse => {
        await sleep(1000)
        return resonse;
},(error: AxiosError)=>{
    
    const {data,status} = error.response as AxiosResponse;    
    switch(status){
        case 400:
            if(data.errors){
                const modalStateErrors = [];
                for(const key in data.errors){
                    if(data.errors[key]){
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            }else{
                toast.error(data);
            }
            break;
        case 401:
            toast.error("unauthorized");
            break;
        case 403:
            toast.error("forbidden");
            break;
        case 404:
            console.log('navigate')
            
            //router.useNavigate('/not-found');
            //router.navigate('/not-found');
            break;                        
        case 500:
            toast.error("Server Error");
            break;
    }
        return Promise.reject(error);
})

const requests ={
    get: <T>(url:string)=> axios.get<T>(url).then(responseBody),
    post:<T>(url:string, body:{})=> axios.post<T>(url, body).then(responseBody),
    put: <T>(url:string, body: {})=> axios.put<T>(url, body).then(responseBody),
    del: <T>(url:string)=> axios.delete<T>(url).then(responseBody)
}

const Activities = {
    list: () => requests.get<Activity[]>('/activities'),
    details: (id:string)=> requests.get<Activity>(`/activities/${id}`),
    create: (activity:Activity) => requests.post<void>('/activities', activity),
    update:(id:string, activity:Activity) => requests.put<void>(`/activities/${id}`, activity),
    delete: (id:string) => requests.del<void>(`/activities/${id}`)
}

const agent ={
    Activities
}

export default agent;