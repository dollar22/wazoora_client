export const DateResolve=(props)=>{
    return props?.toISOString().split('T')[0];

}