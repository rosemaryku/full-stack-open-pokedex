import React from 'react'
import { render, screen } from '@testing-library/react'
import axiosMock from 'axios'
import { act } from 'react-dom/test-utils'
import '@testing-library/jest-dom/extend-expect'
import App from '../src/App'

jest.mock('axios')

describe('<App />', () => {
  it('fetches data', async () => {
    axiosMock.get.mockResolvedValueOnce(
      {
        data: {
          results: [{ url: 'https://pokeapi.co/api/v2/pokemon/1/', name: 'bulbasaur', id: 1 }]
        }
      }
    )
    await act(async () => {
      render(<App />)
    })
    expect(axiosMock.get).toHaveBeenCalledTimes(1)
  })

  it('shows Loader', async () => {
    axiosMock.get.mockResolvedValueOnce({})
    await act(async () => {
      const { getByAltText } = render(<App />)
      expect(getByAltText('Loading...')).toBeVisible()
    })
  })

  it('shows error', async () => {
    axiosMock.get.mockResolvedValueOnce(Promise.reject(new Error()))
    await act(async () => {
      render(<App />)
    })
    expect(screen.getByTestId('error')).toBeVisible()
  })
})