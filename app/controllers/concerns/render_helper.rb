module RenderHelper
  extend ActiveSupport::Concern

  def render_failure_json(status: nil, errors: [])
    render json: {
      errors: errors,
    }, status: status
  end

  def render_success_json(data: {})
    render_params = {
      json: data,
      status: 200,
      include: '**',
    }
    render render_params.compact
  end

  def render_service(outcome: nil)
    if outcome.valid?
      render_service_success_json(outcome)
    else
      render_service_failure_json(outcome)
    end
  end

  def render_service_success_json(outcome)
    render_success_json(data: outcome.result)
  end

  def render_service_failure_json(outcome)
    render_failure_json(
      status: outcome.failure_status || 422,
      errors: outcome.errors,
    )
  end

  def render_access_denied
    render_failure_json(status: 401, errors: 'Access denied')
  end
end
