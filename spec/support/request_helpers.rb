module RequestHelpers
  def json_response_data
    @json_response ||= begin
      json = JSON.parse(response.body)
      json.is_a?(Hash) ? json.with_indifferent_access : json
    end

    @json_response['data']
  end
end

RSpec.configure do |config|
  config.include RequestHelpers, type: :request
end
