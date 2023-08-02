
import {useEffect,useState} from 'react';
  
const InterfazClientes = () => {
    
  const[record,setRecord] = useState([])

  /*Defino el objetivo con sus respectivas propiedades que se usará para el muestro de info en modal*/ 
  const [rs,setrs] = useState({
     saldo:'',
     tipo_letras:'',
     n:''
  })

  const[info, setInfo] = useState({})
  
  const urlInicial = 'https://api.npoint.io/97d89162575a9d816661/'

/*Obtención y seteo de datos desde la API otorgada*/
   const obtenerInfo = (url) =>
   {
       fetch(url)
       .then(response=> response.json())
       .then(data=>{setRecord(data.cuentas);
                    setInfo(data.info)
        })
   }
   


/*
   const onNext = (record) => {        
      console.log(record)    
   }
*/  
/*Muestreo de info adicional del cliente*/
   const mostrarDetalles = (id) =>
    {       
      fetch(`https://api.npoint.io/97d89162575a9d816661/cuentas/${id}`)
      .then(response=> response.json())
      .then(res=>setrs(res))
    }

   useEffect(() => {
      obtenerInfo(urlInicial);
   },[])
    
    
    
  let cant=5;
  
  return (
    
    <div className="container mt-2" style={{width:'1024px',height:'768px'}}>      
        <div className='row mt-2'>            
            <div className='col-lg-11 col-md-6 col-sm-12' style={{backgroundColor: 'rgba(126, 207, 145,0.5)',borderRadius:'15px',borderStyle:'solid',borderColor:'rgba(20, 60, 99,0.9)'}}>
              <label style={{textAlign:'center', display:'block'}}>Consulta de saldo</label>
              <h3 className='mt-3 mb-3 ' style={{textAlign:'center',color:'rgba(20, 60, 99,1)'}}>
               Selecciona la cuenta a consultar
              </h3>
                <div className='mt-5'>
                    <table className='table' style={{textAlign:'center'}}>                        
                        <tbody>                         
                          {record.slice(0,13).map((cliente,index)=>                                                                                
                              <tr key={index}>
                                {((cliente.tipo_letras==="CA"||cliente.tipo_letras==="CC") && (cliente.moneda==="u$s"||cliente.moneda==="$") && (cliente.n!==" ")&&(cant>0))?(                                                                  
                                    
                                    <td id="cosa" style={{borderStyle:'none'}}>
                                       {cant -= parseInt(cliente.e)}                                      
                                      <button className='btn btn-success' onClick={(e)=>mostrarDetalles(index)} data-bs-toggle="modal" data-bs-target="#myModal" style={{minWidth:'200px'}}> 
                                        <label style={{cursor:'pointer'}}>{cliente.n}</label>
                                        <br></br>
                                        {                                          
                                          (cliente.tipo_letras==="CC")?(
                                            <label style={{cursor:'pointer'}}>Cuenta Corriente</label>
                                          ):(cliente.tipo_letras==="CA")?(
                                            <label style={{cursor:'pointer'}}>Caja de Ahorro</label>
                                          ):null                   
                                        }                                  
                                      </button>
                                    </td>                                                                                                                          
                                ):null
                                }                                
                              </tr>                                                                               
                           )}
                           {
                            (cant===0)?(
                              <button className="btn btn-success"style={{minWidth:'200px',textAlign:'center'}}>Siguiente</button>
                            ):null 
                          }                                                                                                     
                        </tbody>                       
                    </table>                    
                </div>
            </div>             
        </div>
        
        {/*console.log(cant)*/}
        {/*(cant===0)?(
         <button className='btn btn-success'style={{minWidth:'px',textAlign:'center'}} onClick={()=>onNext(record)}>Siguiente</button>
        ):null*/}

        
  {
    /*Muestra de ventana alternativa para mas info del cliente detallado*/ 

      <div className='modal' id="myModal">
        <div className='modal-dialog' style={{width:"700px"}}>
          <div className='modal-content'>
            <div className='modal-header'>
                <h5 className='modal-title' id="exampleModalLabel">Detalles del cliente</h5>
                <button type="button" className='btn-close' data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className='modal-body'>
                <p>Saldo : {rs.saldo}</p>
                { 
                  (rs.tipo_letras==="CC"&&rs.moneda==="$")?(
                    <p>Tipo de cuenta : Cuenta Corriente en Pesos</p>
                  ):(rs.tipo_letras==="CC"&&rs.moneda==="u$s")?(
                    <p>Tipo de cuenta : Cuenta Corriente en Dolares</p>
                  ):(rs.tipo_letras==="CA"&&rs.moneda==="$")?(
                    <p>Tipo de cuenta : Caja de ahorro en Pesos</p>
                  ):(rs.tipo_letras==="CA"&&rs.moneda==="u$s")?(
                    <p>Tipo de cuenta : Caja de ahorro en Dolares</p>
                  ):null                 
                }                
                <p>Numero de la cuenta : {rs.n}</p>
            </div>              
            <div className='modal-footer'>
                <button type="button" className='btn btn-secondary' data-bs-dismiss="modal">Salir</button>
            </div>              
          </div>
        </div>
      </div>
  }
    </div>
    )
}
  
  
export default InterfazClientes