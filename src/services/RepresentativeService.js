import Api from './Api';

const getRepresentatives = ({state}) => {
    const {data} = Api.get(`representatives/${state}`)
    return data.results
}

export default {
    getRepresentatives,
}