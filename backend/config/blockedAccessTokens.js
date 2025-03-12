const BlackList = new Set();

export const addToBlackList = (token)=>
{
    BlackList.add(token);
}
export const isInBlackList = (token)=>
{
    return BlackList.has(BlackList);
}