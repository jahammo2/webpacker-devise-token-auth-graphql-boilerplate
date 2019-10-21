class Mutations::Base < GraphQL::Schema::RelayClassicMutation
  def resolve_service(outcome: nil)
    return outcome.result if outcome.valid?

    GraphQL::ExecutionError.new(
      {
        errors: outcome.errors.full_messages,
      }.to_json,
    )
  end
end
