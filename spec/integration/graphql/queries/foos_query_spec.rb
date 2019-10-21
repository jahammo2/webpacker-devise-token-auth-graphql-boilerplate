require 'rails_helper'

describe 'query foos', as: :request do
  subject { post '/api/graphql', params: params }
  let!(:foo) { create(:foo) }
  let(:query) do
    "
      query foos {
        foos {
          bar
        }
      }
    "
  end
  let(:params) do
    {
      graphql: {
        query: query,
      },
    }
  end

  it 'returns 200' do
    subject
    expect(response).to be_successful
  end

  it 'returns all the foos' do
    subject
    expect(json_response_data['foos'].size).to be > 0
    expect(json_response_data['foos']).to include(bar: foo.bar)
  end
end
