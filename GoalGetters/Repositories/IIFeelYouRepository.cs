using GoalGetters.Models;
using System.Collections.Generic;

namespace GoalGetters.Repositories
{
    public interface IIFeelYouRepository
    {
        public void Delete(IFeelYou like);
        public void Add(IFeelYou like);
        public List<IFeelYou> GetAllLikes();

    }
}
