import { useParams } from 'react-router-dom'

export function ProductPage() {
  const { slug } = useParams()

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-serif font-bold text-gray-900 mb-8">Product: {slug}</h1>
      <div className="text-center py-16">
        <p className="text-gray-600">Product page coming soon...</p>
      </div>
    </div>
  )
}
