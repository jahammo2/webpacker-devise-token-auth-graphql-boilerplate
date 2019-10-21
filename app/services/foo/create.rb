class Foo::Create < ServiceBase
  hash :args do
    string :bar
  end

  def execute
    validate_and_save(foo)
  end

  private

  def foo
    @foo ||= Foo.new(args)
  end
end
