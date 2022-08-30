using GoalGetters.Models;
using System.Collections.Generic;

namespace GoalGetters.Repositories
{
    // interface for the IFeelYourepo. all classes must have at least these methods to be considered part of the interface
    public interface IIFeelYouRepository
    {
        public void Delete(IFeelYou like);
        public void Add(IFeelYou like);
        public List<IFeelYou> GetAllLikes();

    }
}
