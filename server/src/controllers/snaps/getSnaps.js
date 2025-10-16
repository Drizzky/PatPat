import getAllSnaps from '../../models/snaps/getAllSnaps.js';

const getSnaps = async (req, res, next) => {
  try {
    // TODO add params for filters
    const snaps = await getAllSnaps();

    res.status(200).json({
      status: 'ok',
      message: 'ok',
      snaps: snaps,
    });
  } catch (err) {
    next(err);
  }
};

export default getSnaps;
