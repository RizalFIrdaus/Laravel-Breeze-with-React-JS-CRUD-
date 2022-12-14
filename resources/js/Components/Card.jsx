import React from 'react';


const NewsPaginate = (news) => {
    return news.map((data, i) => {
        return (
            <div className="card w-full lg:w-96 bg-base-100 shadow-xl" key={i}>
                <figure><img src={data.image} alt="Shoes" /></figure>
                <div className="card-body">
                    <h2 className="card-title">
                        {data.title}
                        <div className="badge badge-secondary">NEW</div>
                    </h2>
                    <p> {data.description}</p>
                    <div className="card-actions justify-end">
                        <div className="badge badge-outline"> {data.category}</div>
                        <div className="badge badge-outline"> {data.author}</div>
                    </div>
                </div>
            </div>
        )
    })
}
const NoContent = () => {
    return (
        <>
            <p>Data Belum Tersedia</p>
        </>
    )
}
const NewsList = ({ news }) => {
    return news ? NewsPaginate(news) : NoContent();
}

export default NewsList

