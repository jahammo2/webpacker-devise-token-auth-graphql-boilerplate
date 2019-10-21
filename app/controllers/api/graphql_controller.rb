class Api::GraphqlController < Api::ApiController
  def execute
    outcome = Graphql::Execute.run(params: graphql_params)
    render_service(outcome: outcome)
  end

  private

  def graphql_params
    params.require(:graphql).permit(
      :operationName,
      :query,
      variables: {},
    )
  end
end
