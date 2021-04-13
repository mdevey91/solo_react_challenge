import Api from './Api';

const getSenators = async (state) => {
    console.log(state)
    const {data} = await Api.get(`senators/${state}`)
    console.log(data)
    return data.results
}

export default {
    getSenators,
}