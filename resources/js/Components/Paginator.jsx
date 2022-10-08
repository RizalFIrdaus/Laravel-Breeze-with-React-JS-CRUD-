
const Paginator = ({ page }) => {
    return page.map((data, i) => {
        return (
            <div key={i}>
                <div className="btn-group" >
                    <a className={data.active === true ? 'btn btn-active ml-3 mr-3' : 'btn'} href={data.url}>{data.label} </a>
                </div>
            </div >
        )
    })
}


export default Paginator