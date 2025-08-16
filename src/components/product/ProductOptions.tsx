
import { ProductOption } from '@/types'
import { cn } from '@/lib/utils'

interface ProductOptionsProps {
  options?: ProductOption[]
  selectedOptions: Record<string, string>
  onOptionsChange: (options: Record<string, string>) => void
}

export function ProductOptions({ options = [], selectedOptions, onOptionsChange }: ProductOptionsProps) {
  const handleOptionChange = (optionName: string, value: string) => {
    const newOptions = {
      ...selectedOptions,
      [optionName]: value,
    }
    onOptionsChange(newOptions)
  }

  if (options.length === 0) {
    return null
  }

  return (
    <div className="space-y-6">
      {options.map((option) => (
        <div key={option.name}>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-gray-900">
              {option.name}
              {option.required && <span className="text-red-500 ml-1">*</span>}
            </label>
            {selectedOptions[option.name] && (
              <span className="text-sm text-gray-600">
                Selected: {selectedOptions[option.name]}
              </span>
            )}
          </div>

          {/* Render different option types */}
          {option.name.toLowerCase().includes('size') && option.values.length <= 10 ? (
            // Size options as buttons
            <div className="flex flex-wrap gap-2">
              {option.values.map((value) => (
                <button
                  key={value}
                  onClick={() => handleOptionChange(option.name, value)}
                  className={cn(
                    'px-4 py-2 border rounded-lg font-medium transition-all duration-200',
                    selectedOptions[option.name] === value
                      ? 'border-primary-600 bg-primary-600 text-white'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-primary-300 hover:bg-primary-50'
                  )}
                >
                  {value}
                </button>
              ))}
            </div>
          ) : option.name.toLowerCase().includes('color') || option.name.toLowerCase().includes('metal') ? (
            // Color/Metal options as color swatches or styled buttons
            <div className="flex flex-wrap gap-3">
              {option.values.map((value) => {
                const isSelected = selectedOptions[option.name] === value
                const colorMap: Record<string, string> = {
                  'Gold': 'bg-yellow-400',
                  'Silver': 'bg-gray-300',
                  'Rose Gold': 'bg-pink-400',
                  'White Gold': 'bg-gray-100 border-gray-300',
                  'Platinum': 'bg-gray-400',
                  'Black': 'bg-gray-900',
                  'White': 'bg-white border-gray-300',
                }
                
                const colorClass = Object.keys(colorMap).find(color => 
                  value.toLowerCase().includes(color.toLowerCase())
                )
                
                return (
                  <button
                    key={value}
                    onClick={() => handleOptionChange(option.name, value)}
                    className={cn(
                      'relative flex items-center gap-3 px-4 py-3 border rounded-lg transition-all duration-200',
                      isSelected
                        ? 'border-primary-600 bg-primary-50 text-primary-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-primary-300'
                    )}
                  >
                    {colorClass && (
                      <div
                        className={cn(
                          'w-6 h-6 rounded-full border-2',
                          colorMap[colorClass],
                          isSelected ? 'border-primary-600' : 'border-gray-300'
                        )}
                      />
                    )}
                    <span className="font-medium">{value}</span>
                    {isSelected && (
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary-600 rounded-full" />
                    )}
                  </button>
                )
              })}
            </div>
          ) : option.values.length <= 6 ? (
            // Small list as buttons
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {option.values.map((value) => (
                <button
                  key={value}
                  onClick={() => handleOptionChange(option.name, value)}
                  className={cn(
                    'px-4 py-3 border rounded-lg font-medium text-sm transition-all duration-200 text-left',
                    selectedOptions[option.name] === value
                      ? 'border-primary-600 bg-primary-600 text-white'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-primary-300 hover:bg-primary-50'
                  )}
                >
                  {value}
                </button>
              ))}
            </div>
          ) : (
            // Large list as dropdown
            <select
              value={selectedOptions[option.name] || ''}
              onChange={(e) => handleOptionChange(option.name, e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              required={option.required}
            >
              <option value="">Select {option.name}</option>
              {option.values.map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          )}

          {/* Option Description/Help Text */}
          {option.name.toLowerCase().includes('size') && (
            <p className="text-xs text-gray-500 mt-2">
              <button className="text-primary-600 hover:text-primary-700 underline">
                Size Guide
              </button>
            </p>
          )}
        </div>
      ))}
    </div>
  )
}
