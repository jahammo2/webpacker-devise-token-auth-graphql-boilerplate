# A decent amount in this file is copied from here:
# https://github.com/zauberware/rails-devise-graphql/blob/master/app/controllers/graphql_controller.rb

class Graphql::Execute < ServiceBase
  object :params, class: ActionController::Parameters

  def execute
    result = execute_schema
    validate_and_return(result)
  end

  private

  def execute_schema
    WebpackerDeviseTokenAuthGraphQLBoilerplateSchema.execute(
      params[:query],
      variables: ensure_hash(params[:variables]),
      context: build_context,
      operation_name: params[:operationName],
    )
  end

  def build_context
    {
      # Query context goes here, for example:
      # current_user: current_user,
    }
  end

  def validate_and_return(result)
    result_errors = result.to_h.with_indifferent_access[:errors]
    add_errors(result_errors) if result_errors
    result
  end

  def add_errors(result_errors)
    result_errors.each do |error|
      errors.add(
        find_error_key(error),
        find_error_message(error),
      )
    end
  end

  def find_error_key(error)
    return error[:path][0] if error[:path]

    params[:query].split('(')[0]
  end

  def find_error_message(error)
    message = error[:message]
    problems = error[:extensions][:problems] || []
    return message if problems.empty?

    explanations = problems.map { |p| p[:explanation] }
    message + '. ' + explanations.join(', ') + '. '
  end

  # Handle form data, JSON body, or a blank value
  def ensure_hash(ambiguous_param) # rubocop:disable Metrics/MethodLength
    case ambiguous_param
    when String
      if ambiguous_param.present?
        ensure_hash(JSON.parse(ambiguous_param))
      else
        {}
      end
    when Hash, ActionController::Parameters
      ambiguous_param
    when nil
      {}
    else
      raise ArgumentError, "Unexpected parameter: #{ambiguous_param}"
    end
  end
end
