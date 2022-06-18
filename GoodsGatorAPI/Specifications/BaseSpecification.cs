using System.Linq.Expressions;

namespace GoodsGatorAPI.Specifications;

public class BaseSpecification<T> : ISpecification<T> where T : class
{
    public Expression<Func<T, bool>> Criteria { get; }
    public List<Expression<Func<T, object>>> Includes { get; } = new List<Expression<Func<T, object>>>();


    public BaseSpecification() { }

    public BaseSpecification(Expression<Func<T, bool>> criteriaExpression)
    {
        Criteria = criteriaExpression;
    }

    protected void AddInclude(Expression<Func<T, object>> IncludeExpression)
    {
        Includes.Add(IncludeExpression);
    }
}
