# APP JS

function App() {
const [loading, setLoading] = useState(true)
const [tours, setTours] = useState([])
const removeTour = (id1) => {
const newTours = tours.filter((tour) => tour.id !== id1)
setTours(newTours)
}

const fetchTours = async () => {
setLoading(true)

    try {
      const response = await fetch(url)
      const tours = await response.json()
      setLoading(false)
      setTours(tours)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }

}
useEffect(() => {
fetchTours()
}, [])
if (loading) {
return (

<main>
<Loading />
</main>
)
}
if (tours.length === 0) {
return (
<main>
<div className='title'>
<h2>No tours left</h2>
<button className='btn' onClick={fetchTours}>
refresh
</button>
</div>
</main>
)
}
return (
<main>
<Tours tours={tours} removeTour={removeTour} />
</main>
)
}

export default App

================================================
Tours.js
================================================
const Tours = ({ tours, removeTour }) => {
return (

<section>
<div className='title'>
<h2>Our tours</h2>
<div className='underline'></div>
</div>
<div>
{tours.map((tour) => {
return <Tour key={tour.id} {...tour} removeTour={removeTour}></Tour>
})}
</div>
</section>
)
}

# export default Tours

# TOUR JS

const Tour = ({ id, image, info, price, name, removeTour }) => {
const [readMore, setReadMore] = useState(false)
return (

<article className='single-tour'>
<img src={image} alt={name} />
<footer>
<div className='tour-info'>
<h4>{name}</h4>
<h4 className='tour-price'>${price}</h4>
        </div>
        <p>
          {readMore ? info : `${info.substring(0, 200)}...`}
<button onClick={() => setReadMore(!readMore)}>
{readMore ? 'show less' : 'read more'}
</button>
</p>
<button onClick={() => removeTour(id)} className='delete-btn'>
Not Interested
</button>
</footer>
</article>
)
}

export default Tour
